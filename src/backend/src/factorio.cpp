#include <array>
#include <string>
#include <vector>

using std::array;
using std::string;
using std::vector;

extern "C"
{
  struct Color
  {
    uint8_t r : 8;
    uint8_t g : 8;
    uint8_t b : 8;
    uint8_t a : 8;
  };

  static_assert(4 == sizeof(Color), "Unexpected size of struct Color.");

  struct FactorioColor
  {
    unsigned char r;
    unsigned char g;
    unsigned char b;
    unsigned char a;
  };

  static_assert(4 == sizeof(FactorioColor), "Unexpected size of struct FactorioColor.");

  struct FactorioPosition
  {
    int x;
    int y;
  };

  enum class EntityType
  {
    SUBSTATION,
    ROBOPORT,
    SOLAR_PANEL,
    ACCUMULATOR,
    STONE_WALL,
    RADAR,
    SE_SPACE_SOLAR_PANEL_3,
    SE_SPACE_ACCUMULATOR_2,
    SE_PYLON_SUBSTATION,
    SE_PYLON_CONSTRUCTION,
    SE_PYLON_CONSTRUCTION_RADAR_ROBOPORT,
    SE_SUPERCHARGER,
  };

  const array<const char *const, 12> ENTITY_TYPE_LABELS{"substation", "roboport", "solar-panel", "accumulator", "stone-wall", "radar", "se-space-solar-panel-3", "se-space-accumulator-2", "se-pylon-substation", "se-pylon-construction", "se-pylon-construction-radar-roboport", "se-supercharger"};

  struct FactorioEntity
  {
    const size_t entity_number;
    const string name;
    const FactorioPosition position;
  };

  enum TileType
  {
    STONE_PATH,
    CONCRETE,
    REFINED_CONCRETE
  };

  const Color TRANSPARENT = {0, 0, 0, 0};

  const array<const char *const, 3> TILE_TYPE_LABELS{"stone-path", "concrete", "refined-concrete"};

  const array<const Color, 3> TILE_TYPE_COLORS{Color{82, 81, 74, 255}, Color{58, 61, 58, 255}, Color{49, 50, 42, 255}}; 

  const array<const string, 5> GRAYSCALE_ITEMS = {"refined-concrete", "concrete", "stone-path", "stone-wall", "nothing"};

  const array<const Color, 5> GRAYSCALE_COLORS = {Color{49, 50, 42, 255}, Color{58, 61, 58, 255}, Color{82, 81, 74, 255}, Color{217, 216, 207, 255}, Color{0, 0, 0, 0}};

  struct FactorioTile
  {
    const string name;
    const FactorioPosition position;
  };

  struct FactorioInnerBlueprint
  {
    const string item = "blueprint";
    const string label = "pixel art";
    vector<FactorioEntity> entities = {};
    vector<FactorioTile> tiles = {};
    const unsigned char version = 1;
  };

  struct FactorioBlueprint
  {
    FactorioInnerBlueprint blueprint;
  };
}