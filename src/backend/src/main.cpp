#include <stdio.h>
#include <cassert>
#include <string>
#include <emscripten/emscripten.h>
#include "zlib.h"
#include "factorio.cpp"

const size_t CHUNK = 1048576;
std::string *import_string = new std::string;

extern "C"
{
  static inline float get_brightness(const Color color)
  {
    return (0.2126f * color.r + 0.7152f * color.g + 0.0772f * color.b) / 255.0f;
  }

  static inline size_t convert_pixel(const Color color)
  {
    if (color.a < 0.5)
    {
      return 4;
    }

    // TODO: the brightnes of the objects isn't really linear. Here I am using it linearly though...
    const float brightness = get_brightness(color) * 4;

    return static_cast<size_t>(brightness < 4 ? brightness : 3);
  };

  EMSCRIPTEN_KEEPALIVE
  static void append_base64_encode(std::string &target, const uint8_t *in, size_t length, bool finalize = false)
  {
    assert(finalize || length % 3 == 0 && "Can only append in steps of 3 bytes...");

    int val = 0;
    int valb = -6;
    for (size_t i = 0; i < length; ++i)
    {
      val = (val << 8) + in[i];
      valb += 8;
      while (valb >= 0)
      {
        target.push_back("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(val >> valb) & 0x3F]);
        valb -= 6;
      }
    }

    if (valb > -6)
      target.push_back("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[((val << 8) >> (valb + 8)) & 0x3F]);

    if (finalize)
      while (target.size() % 4)
        target.push_back('=');
  }

  EMSCRIPTEN_KEEPALIVE
  static void serialize_string(const std::string &source, std::string &target)
  {
    int ret, flush;
    unsigned have;
    unsigned remainder;
    z_stream strm;
    unsigned char out[CHUNK];
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
      strm.avail_in = std::min(in_length, CHUNK);
      flush = in_length <= CHUNK ? Z_FINISH : Z_NO_FLUSH;
      strm.next_in = (Bytef *)in;
      in += strm.avail_in;

      do
      {
        strm.avail_out = CHUNK - remainder;
        strm.next_out = out + remainder;
        ret = deflate(&strm, flush);
        assert(ret != Z_STREAM_ERROR);
        have = CHUNK - strm.avail_out;
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
  const char *process(Color *buffer_from, Color *buffer_to, size_t width, size_t height, size_t tiles_per_pixel)
  {
    printf("[wasm] Received %p, %p, %zu, %zu, %zu\n", buffer_from, buffer_to, width, height, tiles_per_pixel);

    size_t entity_id = 0;

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
        const auto value = convert_pixel(buffer_from[i]);

        buffer_to[i] = GRAYSCALE_COLORS[value];

        switch (value)
        {
        case 0: // refined-concrete
        case 1: // concrete
        case 2: // stone-path
          if (!tiles.empty())
          {
            tiles += ',';
          }
          tiles += "{\"name\":\"";
          tiles += GRAYSCALE_ITEMS[value];
          tiles += "\",\"position\":{\"x\":";
          tiles += std::to_string(x);
          tiles += ",\"y\":";
          tiles += std::to_string(y);
          tiles += "}}";
          break;
        case 3: // stone-wall
          if (!entities.empty())
          {
            entities += ',';
          }
          entities += "{\"entity_number\":";
          entities += std::to_string(entity_id++);
          entities += ",\"name\":\"";
          entities += GRAYSCALE_ITEMS[value];
          entities += "\",\"position\":{\"x\":";
          entities += std::to_string(x);
          entities += ",\"y\":";
          entities += std::to_string(y);
          entities += "}}";
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
