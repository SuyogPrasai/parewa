import { defineCliConfig } from 'sanity/cli'
import { dataset, projectId } from './env'

export default defineCliConfig({
  api: {
    projectId: projectId,
    dataset: dataset,
  },
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
  typegen: {
    path: "../web/src/**/*.{ts,tsx,js,jsx}",
    schema: "./schema.json",
    generates: "../web/src/sanity/types.ts",
  }
})
