import en_general from './translations/en/general'
import en_networking from './translations/en/networking'
import en_sensors from './translations/en/sensors'
import en_system from './translations/en/system'

import de_general from './translations/de/general'
import de_networking from './translations/de/networking'
import de_sensors from './translations/de/sensors'
import de_system from './translations/de/system'

let en = Object.assign(en_general,en_networking, en_sensors,
    en_system)
let de = Object.assign(de_general,de_networking, de_sensors,
    de_system)

export default {
  en,
  de
};
