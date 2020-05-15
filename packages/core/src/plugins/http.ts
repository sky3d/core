import assert = require('assert')
import { NotFoundError } from 'common-errors'
import { Microfleet, PluginTypes } from '../'

/**
 * Plugin Name
 */
export const name = 'http'

/**
 * Plugin Type
 */
export const type = PluginTypes.transport

/**
 * Relative priority inside the same plugin group type
 */
export const priority = 0

/**
 * Attaches HTTP handler.
 * @param config - HTTP handler configuration to attach.
 */
export function attach(this: Microfleet, opts: any = {}) {
  const { validator } = this

  assert(this.hasPlugin('validator'), new NotFoundError('validator module must be included'))

  const config = validator.ifError('http', opts)

  // server specific config
  if (config.server && config.server.handlerConfig) {
    config.server.handlerConfig = validator.ifError(`http.${config.server.handler}`, config.server.handlerConfig)
  }

  const handler = require(`./http/handlers/${config.server.handler}`).default

  return handler(config, this)
}
