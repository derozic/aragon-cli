const { ensureWeb3 } = require('../../helpers/web3-fallback')
const findUp = require('find-up')
const APM = require('@aragon/apm')

exports.command = 'versions'

exports.describe = 'List all versions of the package'

exports.handler = async function ({ reporter, module, bump, cwd, network, apm: apmOptions }) {
  const web3 = await ensureWeb3(network)

  apmOptions.ensRegistryAddress = apmOptions['ens-registry']

  const versions = await APM(web3, apmOptions).getAllVersions(module.appName)
  reporter.info(`${module.appName} has ${versions.length} published versions`)
  versions.map((version) => {
    reporter.success(`${version.version}: ${version.contractAddress} ${version.content.provider}:${version.content.location}`)
  })
  process.exit()
}
