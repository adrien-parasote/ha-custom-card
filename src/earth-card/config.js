/****** COMPONENTS VERSION *******/
export const VERSION = "DEV";

/****** DEV HASS *******/
export const hass = {
  states: {
    "binary_sensor.workday_sensor": {
      state: "off",
      attributes: {
        workdays: ["mon", "tue", "wed", "thu", "fri"],
        excludes: ["sat", "sun", "holiday"],
        days_offset: 0,
        friendly_name: "Workday Sensor",
      },
    },
    "binary_sensor.school_sensor": {
      state: "on",
      attributes: {
        icon: "mdi:account-school-outline",
        friendly_name: "school sensor",
      },
    },
    "climate.clou": {
      state: "cool", // off, heat, cool
      attributes: {
        hvac_modes: ["off", "heat"],
        min_temp: 7,
        max_temp: 35,
        target_temp_step: 0.1,
        preset_modes: ["none", "eco"],
        current_temperature: 21.1,
        temperature: 5,
        hvac_action: "off",
        preset_mode: "none",
        friendly_name: "Clou",
        supported_features: 401,
      },
    },
    "switch.powercar": {
      state: "on", // unknown, on , off
      attributes: {
        friendly_name: "evlink",
      },
    },
    "light.group": {
      state: "off", // off, on
      attributes: {
        supported_color_modes: ["onoff"],
        icon: "mdi:lightbulb-group",
        friendly_name: "Lights",
        supported_features: 0,
        color_mode: null,
        entity_id: ["light.light_1", "light.light_2"],
      },
    },
    "climate.radiator_1": {
      state: "off", // heat, auto, off
      attributes: {
        hvac_modes: ["heat", "auto", "off"],
        min_temp: 7,
        max_temp: 35,
        preset_modes: [
          "none",
          "frost_protection",
          "eco",
          "comfort",
          "comfort-1",
          "comfort-2",
          "auto",
          "boost",
          "external",
          "prog",
        ],
        current_temperature: 19,
        temperature: 19,
        preset_mode: "eco",
        friendly_name: "Radiator 1",
        supported_features: 401,
      },
    },
    "climate.radiator_2": {
      state: "heat", // heat, auto, off
      attributes: {
        hvac_modes: ["heat", "auto", "off"],
        min_temp: 7,
        max_temp: 35,
        preset_modes: [
          "none",
          "frost_protection",
          "eco",
          "comfort",
          "comfort-1",
          "comfort-2",
          "auto",
          "boost",
          "external",
          "prog",
        ],
        current_temperature: 19,
        temperature: 19,
        preset_mode: "eco",
        friendly_name: "Radiator 2",
        supported_features: 401,
      },
    },
    "climate.radiator_3": {
      state: "auto", // heat, auto, off
      attributes: {
        hvac_modes: ["heat", "auto", "off"],
        min_temp: 7,
        max_temp: 35,
        preset_modes: [
          "none",
          "frost_protection",
          "eco",
          "comfort",
          "comfort-1",
          "comfort-2",
          "auto",
          "boost",
          "external",
          "prog",
        ],
        current_temperature: 19,
        temperature: 19,
        preset_mode: "eco",
        friendly_name: "Radiator 3",
        supported_features: 401,
      },
    },
    "vacuum.dobby": {
      state: "error", // cleaning, docked, returning, error, idle
      attributes: {
        fan_speed_list: ["Silent", "Standard", "Medium", "Turbo"],
        battery_level: 100,
        battery_icon: "mdi:battery-charging-100",
        fan_speed: "Medium",
        status: "Charging",
        friendly_name: "Dobby",
        supported_features: 14204,
      },
    },
  },
};

/****** DEV CONFIG *******/
export const config = {
  time_sensors: [
    {
      entity: "binary_sensor.workday_sensor",
    },
    {
      entity: "binary_sensor.school_sensor",
      type: "school",
    },
  ],
  info_sensors: [
    {
      entity: "climate.clou",
      type: "stove",
    },
    {
      entity: "switch.powercar",
      type: "car",
    },
    {
      entity: "light.group",
    },
    {
      entity: "vacuum.dobby",
    },
    {
      entities: [
        "climate.radiator_1",
        "climate.radiator_2",
        "climate.radiator_3",
      ],
      type: "radiators",
    },
  ],
};