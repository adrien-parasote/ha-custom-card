import { state } from "lit/decorators.js";

export const hass = {
  states: {
    person1: {
      attributes: {
        entity_picture: "/images/people.png",
        friendly_name: "Punk 1",
      },
      state: "Spaceship",
    },
    person2: {
      attributes: {
        entity_picture: "/images/people.png",
        friendly_name: "Punk 2",
      },
      state: "Spaceship",
    },
    "binary_sensor.workday_sensor": {
      state: "on",
    },
    "binary_sensor.ecole_aujourdhui": {
      attributes: {
        icon: "Ecole",
      },
      last_updated: "01/11/2024 14:18:33",
      state: "on",
    },
    "sensor.clou_pellet_quantity": {
      last_updated: "01/11/2024 14:18:33",
      state: 83,
    },
    "counter.pellet_stock": {
      attributes: {
        icon: "counter",
      },
      last_updated: "01/11/2024 14:18:33",
      state: 50,
    },
    "sensor.gas_station": {
      attributes: {
        e10_maj: "01/11/2024 14:18:33",
        e10_prix: "1.557 €",
        friendly_name: "Gaz station",
      },
    },
    "sun.sun": {
      attributes: {
        next_dawn: "2024-11-08T06:27:28.486674+00:00",
        next_dusk: "2024-11-08T17:11:44.001791+00:00",
        next_midnight: "2024-11-07T23:49:54+00:00",
        next_noon: "2024-11-08T11:49:51+00:00",
        next_rising: "2024-11-08T07:00:50.404787+00:00",
        next_setting: "2024-11-08T16:38:24.074521+00:00",
        elevation: -34.85,
        azimuth: 283.98,
        rising: false,
        friendly_name: "Sun",
      },
      state: "below_horizon",
    },
    "weather.city": {
      attributes: {
        temperature: 11.9,
        temperature_unit: "°C",
        humidity: 95,
        pressure: 1025.1,
        pressure_unit: "hPa",
        wind_bearing: 85,
        wind_speed: 10.8,
        wind_speed_unit: "km/h",
        visibility_unit: "km",
        precipitation_unit: "mm",
        friendly_name: "city",
      },
      state: "partlycloudy",
    },
  },
  callService: function (srv, name, data) {
    console.log("Call srv : " + srv + "." + name + " with data :");
    console.log(data);
  },
};

export const config = {
  people: ["person1", "person2"],
  actions: [
    {
      icon: "mdi:bell-ring-outline",
      title: "Call kids",
      tap_action: {
        service: "automation.trigger",
        service_data: {
          entity_id: "automation.call_kids",
        },
      },
    },
    {
      icon: "mdi:door",
      title: "Clean entry",
      tap_action: {
        service: "xiaomi_miio.vacuum_clean_segment",
        service_data: {
          entity_id: "vacuum.dobby",
          segments: [17],
        },
      },
    },
    {
      icon: "mdi:broom",
      title: "Clean daily",
      tap_action: {
        service: "xiaomi_miio.vacuum_clean_segment",
        service_data: {
          entity_id: "vacuum.dobby",
          segments: [17, 18],
        },
      },
    },
    {
      icon: "mdi:silverware-fork-knife",
      title: "Clean kitchen",
      tap_action: {
        service: "xiaomi_miio.vacuum_clean_segment",
        service_data: {
          entity_id: "vacuum.dobby",
          segments: [17, 18],
        },
      },
    },
  ],
  info: [
    {
      entity: "binary_sensor.ecole_aujourdhui",
      title: "École",
      data: {
        render_type: "circle",
      },
    },
    {
      entity: "sensor.clou_pellet_quantity",
      icon: "mdi:battery-80",
      title: "Pellet poêle",
      data: {
        unit: "%",
        render_type: "graph",
      },
    },
    {
      entity: "counter.pellet_stock",
      title: "Sac pellet en stock",
      data: {
        unit: "sac",
        threshold: 0.8,
        render_type: "graph",
      },
    },
    {
      entity: "sensor.gas_station",
      icon: "mdi:gas-station-outline",
      secondary: "e10_maj",
      data: {
        value: "e10_prix",
        text: "E10",
        render_type: "text",
      },
    },
    {
      entity: "sensor.gas_station",
      icon: "mdi:gas-station-outline",
      secondary: "e10_maj",
      data: {
        value: "e10_prix",
        text: "E10",
        render_type: "text",
      },
    },
  ],
  work_day: "binary_sensor.workday_sensor",
  sun: "sun.sun",
  weather: "weather.city",
};
