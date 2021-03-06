import assert = require('assert')
import Bluebird = require('bluebird')
import { NotSupportedError } from 'common-errors'
import Extensions, { ExtensionsConfig, LifecyclePoints } from '..'

describe('router: extensions', () => {
  it('should be able to auto register extension', async () => {
    const config: ExtensionsConfig = {
      enabled: [
        LifecyclePoints.preHandler,
        LifecyclePoints.postHandler,
      ],
      register: [
        [
          { point: LifecyclePoints.postHandler, handler: Bluebird.resolve },
        ],
      ],
    }

    const extensions = new Extensions(config)

    assert.doesNotThrow(() => {
      extensions.register(LifecyclePoints.preHandler, () => Bluebird.reject(new Error('q')))
    })

    await extensions.exec('postHandler', ['foo'])
  })

  it('should not be able to execute unknown extension', async () => {
    const extensions = new Extensions()

    const inspection = await extensions
      .exec('postPreHandler', ['foo'])
      .reflect()

    const error = inspection.reason()
    assert(error instanceof NotSupportedError)
    assert.equal(error.message, 'Not Supported: postPreHandler')
  })
})
