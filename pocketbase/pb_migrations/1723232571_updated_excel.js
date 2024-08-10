/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i0x9f94agyjp970")

  collection.listRule = "@request.auth.id != \"\""

  // remove
  collection.schema.removeField("r9ftsww0")

  // remove
  collection.schema.removeField("zr1bv71j")

  // remove
  collection.schema.removeField("zzfqezyo")

  // remove
  collection.schema.removeField("bppmg0nx")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "1ncpkq8v",
    "name": "provider",
    "type": "relation",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "collectionId": "9bg0galjpayom75",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dsly3suk",
    "name": "category",
    "type": "relation",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "collectionId": "x9lgyk1lbdvoovd",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "oyisyfxh",
    "name": "total_amount",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "idg0v93b",
    "name": "reception_date",
    "type": "date",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i0x9f94agyjp970")

  collection.listRule = null

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r9ftsww0",
    "name": "provider",
    "type": "relation",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "collectionId": "9bg0galjpayom75",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zr1bv71j",
    "name": "category",
    "type": "relation",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "collectionId": "x9lgyk1lbdvoovd",
      "cascadeDelete": true,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zzfqezyo",
    "name": "total_amount",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bppmg0nx",
    "name": "reception_date",
    "type": "date",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // remove
  collection.schema.removeField("1ncpkq8v")

  // remove
  collection.schema.removeField("dsly3suk")

  // remove
  collection.schema.removeField("oyisyfxh")

  // remove
  collection.schema.removeField("idg0v93b")

  return dao.saveCollection(collection)
})
