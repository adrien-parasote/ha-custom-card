/****** DEV HASS *******/
export const hass = {
  states: {
    "punk.1": {
      state: "home",
      attributes: {
        editable: true,
        id: "punk2",
        device_trackers: ["device_tracker.ipad", "device_tracker.iphone"],
        latitude: 47.30682373046875,
        longitude: -1.5416121443667852,
        gps_accuracy: 7,
        source: "device_tracker.iphone",
        user_id: "user_id_punk_1",
        entity_picture: "/images/people.png",
        friendly_name: "Punk 1",
      },
    },
    "punk.2": {
      state: "Not home",
      attributes: {
        editable: true,
        id: "punk2",
        device_trackers: ["device_tracker.ipad", "device_tracker.iphone"],
        latitude: 47.30682373046875,
        longitude: -1.5416121443667852,
        gps_accuracy: 7,
        source: "device_tracker.iphone",
        user_id: "user_id_punk_2",
        entity_picture: "/images/people.png",
        friendly_name: "Punk 2",
      },
    },
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
    "climate.clouOff": {
      state: "off", // off, heat, cool
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
    "climate.clouHeat": {
      state: "heat", // off, heat, cool
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
    "climate.clouCool": {
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
    "vacuum.dobbyCleaning": {
      state: "cleaning", // cleaning, docked, returning, error, idle
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
    "vacuum.dobbyError": {
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
    "vacuum.dobbyDocked": {
      state: "docked", // cleaning, docked, returning, error, idle
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
    "vacuum.dobbyReturning": {
      state: "returning", // cleaning, docked, returning, error, idle
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
    "vacuum.dobbyIdle": {
      state: "idle", // cleaning, docked, returning, error, idle
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

    "light.light_group_off": {
      state: "off", // on, off
      attributes: {
        supported_color_modes: ["on", "off"],
        color_mode: null,
        entity_id: [],
        icon: "mdi:lightbulb-group",
        friendly_name: "Lumières",
      },
    },

    "light.light_group_on": {
      state: "on", // on, off
      attributes: {
        supported_color_modes: ["on", "off"],
        color_mode: null,
        entity_id: [],
        icon: "mdi:lightbulb-group",
        friendly_name: "Lumières",
      },
    },
  },
};

/****** DEV CONFIG *******/
export const config = {
  "people-card": {
    people: ["punk.1", "punk.2"],
  },
  "info-card": {
    info: [
      {
        entity: "light.light_group_off",
        type: "light",
      },
      {
        entity: "light.light_group_on",
        type: "light",
      },
      {
        entity: "climate.clouCool",
        type: "stove",
      },
      {
        entity: "climate.clouHeat",
        type: "stove",
      },
      {
        entity: "climate.clouOff",
        type: "stove",
      },
      {
        entity: "climate.clouOff",
        type: "",
      },
      {
        entity: "vacuum.dobbyCleaning",
        type: "vacuum",
      },
      {
        entity: "vacuum.dobbyError",
        type: "vacuum",
      },
      {
        entity: "vacuum.dobbyDocked",
        type: "vacuum",
      },
      {
        entity: "vacuum.dobbyReturning",
        type: "vacuum",
      },
      {
        entity: "vacuum.dobbyIdle",
        type: "vacuum",
      },
    ],
  },
};
