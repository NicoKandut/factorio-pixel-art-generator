#include <array>
#include <string>
#include <vector>
#include <emscripten/bind.h>

using std::array;
using std::string;
using std::vector;

enum class Mode
{
  GRAYSCALE,
  COLORED,
};

struct Color
{
  uint8_t r : 8;
  uint8_t g : 8;
  uint8_t b : 8;
  uint8_t a : 8;

  inline float get_brightness() const
  {
    return (0.299f * r + 0.587f * g + 0.114f * b) / 256.0f;
  }

  Color operator-(const Color &x) const
  {
    return Color{
        static_cast<uint8_t>(abs(this->r - x.r)),
        static_cast<uint8_t>(abs(this->g - x.g)),
        static_cast<uint8_t>(abs(this->b - x.b)),
        static_cast<uint8_t>(abs(this->a - x.a)),
    };
  }
};

static_assert(4 == sizeof(Color), "Unexpected size of struct Color");

enum class Item
{
  // GRAYSCALE
  REFINED_CONCRETE,
  CONCRETE,
  STONE_PATH,
  STONE_WALL,
  NOTHING,

  // TINTED CONCRETE
  YELLOW_REFINED_CONCRETE,
  RED_REFINED_CONCRETE,
  PURPLE_REFINED_CONCRETE,
  PINK_REFINED_CONCRETE,
  ORANGE_REFINED_CONCRETE,
  GREEN_REFINED_CONCRETE,
  CYAN_REFINED_CONCRETE,
  BROWN_REFINED_CONCRETE,
  BLUE_REFINED_CONCRETE,
  BLACK_REFINED_CONCRETE,
  ACID_REFINED_CONCRETE,
};

const std::array<const char *const, 16> ITEM_NAME{
    "refined-concrete",
    "concrete",
    "stone-path",
    "stone-wall",
    "nothing",

    "yellow-refined-concrete",
    "red-refined-concrete",
    "purple-refined-concrete",
    "pink-refined-concrete",
    "orange-refined-concrete",
    "green-refined-concrete",
    "cyan-refined-concrete",
    "brown-refined-concrete",
    "blue-refined-concrete",
    "black-refined-concrete",
    "acid-refined-concrete",
};

const std::array<const Color, 16> ITEM_COLOR = {
    Color{49, 50, 42, 255},
    Color{58, 61, 58, 255},
    Color{82, 81, 74, 255},
    Color{217, 216, 207, 255},
    Color{0, 0, 0, 0},

    Color{214, 170, 16, 255},
    Color{206, 4, 0, 255},
    Color{123, 28, 173, 255},
    Color{239, 97, 132, 255},
    Color{222, 125, 33, 255},
    Color{16, 194, 41, 255},
    Color{66, 194, 181, 255},
    Color{74, 28, 0, 255},
    Color{33, 138, 230, 255},
    Color{25, 24, 25, 255},
    Color{140, 194, 41, 255},
};

static_assert(ITEM_NAME.size() == ITEM_COLOR.size(), "Number of item names and item colors has to be equal");