// @ts-nocheck
import { SQLDataSource } from 'datasource-sql'
import camelize from 'camelize'

class Lens extends SQLDataSource {
  async getAllLens() {
    const data = await this.knex.select('*').from('lens').cache(60)

    return camelize(data)
  }

  async getLens(lensName: string) {
    const data = await this.knex('lens').where('lens_name', lensName).first()

    return camelize(data)
  }
}

export default Lens
