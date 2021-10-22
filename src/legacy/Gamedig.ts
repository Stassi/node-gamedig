// @ts-ignore
import QueryRunner from './QueryRunner.js'

export default {
  query(userOptions: any) {
    return new QueryRunner(undefined).run(userOptions)
  },
}
