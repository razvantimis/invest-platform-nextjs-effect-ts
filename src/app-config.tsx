import { Config, ConfigProvider, Effect, Layer, Logger, LogLevel } from "effect";

export const appConfig: {
  mode: "comingSoon" | "maintenance" | "live";
  appTitle: string;
  appDescription: string;
} = {
  mode: "comingSoon",
  appTitle: "Invest Platform",
  appDescription: "Invest platform | Learn about your stocks",
};

export const applicationName = "Invest Platform";
export const companyName = "TIMIS TECHNOLOGY SOLUTIONS SRL ";

export const afterLoginUrl = "/dashboard";


const LogLevelLive = Config.logLevel("LOG_LEVEL").pipe(
  Effect.andThen((level) => Logger.minimumLogLevel(level)),
  Layer.unwrapEffect
)
export const AppConfigLive = Layer.provide(
  LogLevelLive,
  Layer.setConfigProvider(
    ConfigProvider.fromMap(new Map([["LOG_LEVEL", LogLevel.Debug.label]]))
  )
);
