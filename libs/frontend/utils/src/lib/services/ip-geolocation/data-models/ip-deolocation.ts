export interface IIpGeolocation {
  ip?: string;
  hostname?: string;
  type?: 'ipv4' | 'ipv6';
  continent_code?: string;
  continent_name?: string;
  country_code?: string;
  country_name?: string;
  region_code?: string;
  region_name?: string;
  city?: string;
  zip?: string;
  latitude?: number;
  longitude?: number;
  location?: IIpGeolocationLocation;
  time_zone?: IIpGeolocationTimeZone;
  currency?: IIpGeolocationCurrency;
  connection?: IIpGeolocationConnection;
  security?: IIpGeololocationSecurity;
}

export interface IIpGeolocationLocation {
  geoname_id?: number;
  capital?: string;
  languages?: IIpGeolocationLocationLanguage[];
  country_flag?: string;
  country_flag_emoji?: string;
  country_flag_emoji_unicode?: string;
  calling_code?: string;
  is_eu?: boolean;
}

export interface IIpGeolocationTimeZone {
  id?: string;
  current_time?: string;
  gmt_offset?: number;
  code?: string;
  is_daylight_saving?: boolean;
}

export interface IIpGeolocationCurrency {
  code?: string;
  name?: string;
  plural?: string;
  symbol?: string;
  symbol_native?: string;
}

export interface IIpGeolocationConnection {
  asn?: number;
  isp?: string;
}

export interface IIpGeololocationSecurity {
  is_proxy?: boolean;
  proxy_type?: 'cgi' | 'web' | 'vpn';
  is_crawler?: boolean;
  crawler_name?: string;
  crawler_type?:
    | 'unrecognized'
    | 'search_engine_bot'
    | 'site_monitor'
    | 'screenshot_creator'
    | 'link_checker'
    | 'wearable_computer'
    | 'web_scraper'
    | 'vulnerability_scanner'
    | 'virus_scanner'
    | 'speed_tester'
    | 'feed_fetcher'
    | 'tool'
    | 'marketeing';
  is_tor?: boolean;
  threat_level?: 'low' | 'medium ' | 'high';
  threat_types?:
    | 'tor'
    | 'fake_crawler'
    | 'web_scraper'
    | 'attack_source'
    | 'attack_source_http'
    | 'attack_source_mail'
    | 'attack_source_ssh';
}

export interface IIpGeolocationLocationLanguage {
  code?: string;
  name?: string;
  native?: string;
}

export type TIpGeolocationField =
  | 'main'
  | 'ip'
  | 'hostname'
  | 'type'
  | 'continent_code'
  | 'continent_name'
  | 'country_code'
  | 'country_name'
  | 'region_code'
  | 'region_name'
  | 'city'
  | 'zip'
  | 'latitude'
  | 'longitude'
  | 'location'
  | 'time_zone'
  | 'currency'
  | 'connection'
  | 'security';

export type TIpGeolocationResponseLanguage = 'en' | 'de' | 'es' | 'fr' | 'ja' | 'pt-br' | 'ru' | 'zh';
