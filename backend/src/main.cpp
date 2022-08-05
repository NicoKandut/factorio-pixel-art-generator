#include <stdio.h>
#include <cassert>
#include <string>
#include <emscripten/emscripten.h>
#include "zlib.h"
#include "factorio.cpp"
#include <math.h>

// chunk size of deflation stream
const size_t STREAM_CHUNK_SIZE = 1048576;

// pointer to final import string
std::string *import_string = new std::string;

extern "C"
{
  static inline Item convert_pixel_grayscale(const Color color)
  {
    static const array<const Item, 4> GRAYSCALE_ITEMS = {
        Item::REFINED_CONCRETE,
        Item::CONCRETE,
        Item::STONE_PATH,
        Item::STONE_WALL,
    };

    if (color.a < 0.5)
    {
      return Item::NOTHING;
    }

    // TODO: the brightnes of the objects isn't really linear. Here I am using it linearly though...
    const float brightness = color.get_brightness() * 4;
    const auto index = static_cast<size_t>(brightness < 4 ? brightness : 3);

    return GRAYSCALE_ITEMS[index];
  };

  static inline float distance_between(Color x, Color y)
  {
    auto diff = x - y;
    return sqrt(diff.r * diff.r * 0.30 + diff.g * diff.g * 0.59 + diff.b * diff.b * 0.11 + diff.a * diff.a * 0.2);
  }

  static inline Item convert_pixel_colored(const Color color)
  {
    float min_distance = 10000.0f;
    size_t closest_color_index = 0;

    for (size_t i = 0; i < ITEM_COLOR.size(); ++i)
    {
      const auto current_distance = distance_between(color, ITEM_COLOR.at(i));
      if (current_distance < min_distance)
      {
        min_distance = current_distance;
        closest_color_index = i;
      }
    }

    return static_cast<Item>(closest_color_index);
  };

  EMSCRIPTEN_KEEPALIVE
  static void append_base64_encode(std::string &target, const uint8_t *in, size_t length, bool finalize = false)
  {
    static const auto alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    assert(finalize || length % 3 == 0 && "Can only append in steps of 3 bytes...");

    int val = 0;
    int valb = -6;
    for (size_t i = 0; i < length; ++i)
    {
      val = (val << 8) + in[i];
      valb += 8;
      while (valb >= 0)
      {
        target.push_back(alphabet[(val >> valb) & 0x3F]);
        valb -= 6;
      }
    }

    if (valb > -6)
    {
      target.push_back(alphabet[((val << 8) >> (valb + 8)) & 0x3F]);
    }

    if (finalize)
    {
      while (target.size() % 4)
      {
        target.push_back('=');
      }
    }
  }

  EMSCRIPTEN_KEEPALIVE
  static void serialize_string(const std::string &source, std::string &target)
  {
    int ret, flush;
    unsigned have;
    unsigned remainder;
    z_stream strm;
    unsigned char out[STREAM_CHUNK_SIZE];
    auto in = source.c_str();
    bool done;

    strm.zalloc = Z_NULL;
    strm.zfree = Z_NULL;
    strm.opaque = Z_NULL;
    ret = deflateInit(&strm, Z_BEST_COMPRESSION);
    if (ret != Z_OK)
    {
      throw(std::runtime_error("deflateInit failed"));
    }

    target.clear();
    target.append("0");

    do
    {
      const auto in_length = strlen(in);
      strm.avail_in = std::min(in_length, STREAM_CHUNK_SIZE);
      flush = in_length <= STREAM_CHUNK_SIZE ? Z_FINISH : Z_NO_FLUSH;
      strm.next_in = (Bytef *)in;
      in += strm.avail_in;

      do
      {
        strm.avail_out = STREAM_CHUNK_SIZE - remainder;
        strm.next_out = out + remainder;
        ret = deflate(&strm, flush);
        assert(ret != Z_STREAM_ERROR);
        have = STREAM_CHUNK_SIZE - strm.avail_out;
        remainder = have % 3;
        done = flush == Z_FINISH;

        if (done)
        {
          append_base64_encode(target, out, have, true);
        }
        else
        {
          append_base64_encode(target, out, have - remainder, false);
          memcpy(out, out + have - remainder, remainder);
        }
      } while (strm.avail_out == 0);
      assert(strm.avail_in == 0);
    } while (flush != Z_FINISH);
    assert(ret == Z_STREAM_END);

    deflateEnd(&strm);
  }

  EMSCRIPTEN_KEEPALIVE
  const char *process(Color *buffer_from, Color *buffer_to, size_t width, size_t height, size_t tiles_per_pixel, size_t mode)
  {
    size_t entity_id = 0;
    const auto convert = static_cast<Mode>(mode) == Mode::GRAYSCALE
                             ? convert_pixel_grayscale
                             : convert_pixel_colored;

    // TODO: maybe it is more efficient to calculate the size of the strings here
    std::string result;
    std::string entities;
    std::string tiles;

    result += "{\"blueprint\":{\"item\":\"blueprint\",\"label\":\"generated blueprint\",\"entities\":[";

    for (size_t y = 0; y < height; ++y)
    {
      for (size_t x = 0; x < width; ++x)
      {
        const auto i = y * width + x;
        const auto item = convert(buffer_from[i]);

        buffer_to[i] = ITEM_COLOR[static_cast<size_t>(item)];

        switch (item)
        {
        case Item::REFINED_CONCRETE:
        case Item::CONCRETE:
        case Item::STONE_PATH:
        case Item::YELLOW_REFINED_CONCRETE:
        case Item::RED_REFINED_CONCRETE:
        case Item::PURPLE_REFINED_CONCRETE:
        case Item::PINK_REFINED_CONCRETE:
        case Item::ORANGE_REFINED_CONCRETE:
        case Item::GREEN_REFINED_CONCRETE:
        case Item::CYAN_REFINED_CONCRETE:
        case Item::BROWN_REFINED_CONCRETE:
        case Item::BLUE_REFINED_CONCRETE:
        case Item::BLACK_REFINED_CONCRETE:
        case Item::ACID_REFINED_CONCRETE:
          if (!tiles.empty())
          {
            tiles += ',';
          }
          tiles += "{\"name\":\"";
          tiles += ITEM_NAME[static_cast<size_t>(item)];
          tiles += "\",\"position\":{\"x\":";
          tiles += std::to_string(x);
          tiles += ",\"y\":";
          tiles += std::to_string(y);
          tiles += "}}";
          break;
        case Item::STONE_WALL:
          if (!entities.empty())
          {
            entities += ',';
          }
          entities += "{\"entity_number\":";
          entities += std::to_string(entity_id++);
          entities += ",\"name\":\"";
          entities += ITEM_NAME[static_cast<size_t>(item)];
          entities += "\",\"position\":{\"x\":";
          entities += std::to_string(x);
          entities += ",\"y\":";
          entities += std::to_string(y);
          entities += "}}";
          break;
        case Item::NOTHING:
          break;
        }
      }
    }

    result += entities;
    result += "],\"tiles\":[";
    result += tiles;
    result += "],\"version\":1}}";

    serialize_string(result, *import_string);

    return import_string->c_str();
  }

  EMSCRIPTEN_KEEPALIVE
  uint8_t *create_buffer(int width, int height)
  {
    const auto size = width * height * 4 * sizeof(uint8_t);
    return (uint8_t *)malloc(size);
  }

  EMSCRIPTEN_KEEPALIVE
  void destroy_buffer(uint8_t *p)
  {
    free(p);
  }
}
