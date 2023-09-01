const db = require('../models/index')
const { BadRequest } = require('../utils/Errors')

module.exports = {

  findOneEntry: async (where, dbTable, message, include, exclude = null , attributes = null) => {
      if (!dbTable) throw new BadRequest("can't find table entry with a null value")

        let entry = await db[dbTable].findOne({ where, include, attributes: { exclude } ,attributes:attributes  });
      if (entry === null)  throw  new NotFoundAR(`${message}`)

      return entry
    },
  findAllEntry: async (where, dbTable, options , include, excludeFiled) => {
    if (!dbTable) throw new BadRequest("can't find table entry with a null value")

    let {size , offset, sort, dir, excludes } = options;

    let whereArray = [], includes = [], exclude = [];

    where ? whereArray = whereArray = [...where] : whereArray;

    //check size , offset, sort, dir, exclude
    size ? size = size : size = 10 ;
    offset ? offset = offset : offset = 0 ;
    sort ? sort = sort : sort = 'id' ;
    dir ? dir = dir : dir = 'ASC' ;
    include ? includes = include : includes ;
    excludeFiled ? exclude = excludeFiled : exclude ;
    excludes !== undefined ? exclude = { exclude: exclude = exclude.concat(excludes) } : exclude = {};
    
    try {

      let entry = await db[dbTable].findAndCountAll( { where: whereArray, offset: offset , limit: size, attributes: exclude, include : includes, order: [[`${sort}`, `${dir}`]] })
    return {data: entry.rows, count: entry.count}
    }
    catch (error){
      throw error
    }
  },

//ex: const user = await baseService.CreateOne('User' ,{ name, phoneNumber, password, email } )
CreateOne: async ( dbTable ,  attributes  ) => {
  if (!dbTable) throw new BadRequest("can't find table entry with a null value")

    let entry = await db[dbTable].create(  attributes );
  if (entry === null)  throw  new NotFoundAR(`${message}`)

  return entry
},
//ex:  // let user = await db.User.update(FieldsToUpdate, { where: { id: request.params.userId } })
UpdateOne: async ( dbTable ,  attributes  , where) => {
  if (!dbTable) throw new BadRequest("can't find table entry with a null value")
  let whereArray = []
  where ? whereArray = whereArray = where : whereArray;
    let entry = await db[dbTable].update( attributes , { where: whereArray });
  if (entry === null)  throw  new NotFoundAR(`${message}`)

  return entry
},
//ex:  let user = await baseService.DestroyOne('User',{ id: request.params.userId })
DestroyOne: async ( dbTable ,  where) => {
  if (!dbTable) throw new BadRequest("can't find table entry with a null value")
  let whereArray = []
  where ? whereArray = whereArray = where : whereArray;
    let entry = await db[dbTable].destroy( { where: whereArray });
  if (entry === null)  throw  new NotFoundAR(`${message}`)

  return entry
},

}