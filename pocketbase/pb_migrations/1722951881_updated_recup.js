/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rryi7qp46a6j629")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q2nmaypk",
    "name": "amount",
    "type": "number",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("rryi7qp46a6j629")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "q2nmaypk",
    "name": "weight",
    "type": "number",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": false
    }
  }))

  return dao.saveCollection(collection)
})
