import * as colors from "colors"
import * as commander from "commander";
import * as updateNotifier from "update-notifier"

import * as pkg from "../../package.json"

import { CommandBuild } from "../commands/build"
import { CommandDev } from "../commands/dev"
import { CommandInit } from "../commands/init"
import { CommandPreview } from "../commands/preview"

import text from "./text"

import { log } from "./log"

export const bin = () => {
  commander.version(pkg.version, "-v, --version")

  /**
   * Regist commander.
   */
  const DEV = "dev"
  commander.command(DEV)
    .description(text.commander.dev.description)
    .action(async () => {
      await CommandDev()
    })

  const BUILD = "build"
  commander.command(BUILD)
    .description(text.commander.build.description)
    .action(async (options) => {
      await CommandBuild()
    })

  const PREVIEW = "preview"
  commander.command(PREVIEW)
    .description(text.commander.preview.description)
    .action(async () => {
      await CommandPreview()
    })

  const INIT = "init"
  commander.command(INIT)
    .action(async () => {
      await CommandInit()
    })

  /**
   * Parse argv.
   */
  commander.parse(process.argv)

  /**
   * When no args given, use dev command
   */
  if (!commander.args.length) {
    CommandDev()
  }

  /**
   * Update notify.
   */
  updateNotifier({ pkg }).notify()

  // Catch error.
  process.on("unhandledRejection", error => {
    log(colors.red(error.toString()))
  })
}