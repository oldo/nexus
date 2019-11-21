import { generateArtifacts } from '../../utils'
import { runPrismaGenerators } from '../../framework/plugins'
import { createBootModuleContent } from '../../framework/boot'
import { scan } from '../../framework/layout'
import { Command } from '../helpers'

export class Generate implements Command {
  public static new(): Generate {
    return new Generate()
  }

  async parse() {
    // const { flags } = this.parse(Generate)

    // Handle Prisma integration
    // TODO pluggable CLI
    await runPrismaGenerators()

    const layout = await scan()

    console.log('🎃  Generating Nexus artifacts ...')
    await generateArtifacts(
      createBootModuleContent({
        stage: 'dev',
        appPath: layout.app.path,
        layout,
      })
    )
    console.log('🎃  Successfully generated the artifacts')
  }
}
