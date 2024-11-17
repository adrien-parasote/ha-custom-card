import { stoveCool, stoveHeat, stoveOff } from "./svg/stove.js";
import { vacuumMoving } from "./svg/vacuum.js";
import {
  mdiCarElectricOutline,
  mdiCarOutline,
  mdiLightbulbOutline,
  mdiLightbulbOnOutline,
  mdiRadiatorDisabled,
  mdiRadiator,
  mdiRadiatorOff,
  mdiRobotVacuumVariantAlert,
  mdiRobotVacuumVariant,
} from "@mdi/js";

export const STATE_TIME_ON = "on";
export const ICON_STATE_CLIMATE = {
  heat: mdiRadiator,
  off: mdiRadiatorOff,
  auto: mdiRadiatorDisabled,
};
export const ICON_STATE_STOVE = {
  off: stoveOff,
  heat: stoveHeat,
  cool: stoveCool,
};
export const ICON_STATE_CAR = {
  off: mdiCarOutline,
  on: mdiCarElectricOutline,
};
export const ICON_STATE_LIGHT = {
  off: mdiLightbulbOutline,
  on: mdiLightbulbOnOutline,
};
export const ICON_STATE_VACUUM = {
  cleaning: vacuumMoving,
  docked: mdiRobotVacuumVariant,
  returning: vacuumMoving,
  error: mdiRobotVacuumVariantAlert,
  idle: mdiRobotVacuumVariant,
};
