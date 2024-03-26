import { describe, it, expect } from 'vitest'
import { rollup } from 'rollup'
import path from 'path'
import rollupPluginCommonPathResolver from '../src/index'

describe('rollup-plugin-common-path-resolver', () => {
  it('should resolve paths correctly for both local and common packages', async () => {
    const bundle = await rollup({
      input: path.resolve(__dirname, 'packages/react/src/index.ts'),
      plugins: [rollupPluginCommonPathResolver()]
    })

    const { output } = await bundle.generate({ format: 'es' })
    const generatedCode = output[0].code

    expect(generatedCode).toContain('This is a common module')
  })
})
