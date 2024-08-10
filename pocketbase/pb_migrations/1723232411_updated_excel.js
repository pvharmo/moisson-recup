/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i0x9f94agyjp970")

  collection.options = {
    "query": "SELECT\n  id, provider, category, SUM(amount) as total_amount, reception_date\nFROM recup\nGROUP BY\n  STRFTIME('%m-%Y', reception_date), provider, category;"
  }

  // remove
  collection.schema.removeField("qqc3mb6e")

  // remove
  collection.schema.removeField("bjukwr8n")

  // remove
  collection.schema.removeField("g0odghku")

  // remove
  collection.schema.removeField("mt6eva7q")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("i0x9f94agyjp970")

  collection.options = {
    "query": "SELECT\n  id, provider, category, SUM(amount) as total_amount, STRFTIME('%m-%Y', reception_date) AS reception_month\nFROM recup\nGROUP BY\n  STRFTIME('%m-%Y', reception_date), provider, category;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qqc3mb6e",
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
    "id": "bjukwr8n",
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
    "id": "g0odghku",
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
    "id": "mt6eva7q",
    "name": "reception_month",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSize": 1
    }
  }))

  // remove
  collection.schema.removeField("r9ftsww0")

  // remove
  collection.schema.removeField("zr1bv71j")

  // remove
  collection.schema.removeField("zzfqezyo")

  // remove
  collection.schema.removeField("bppmg0nx")

  return dao.saveCollection(collection)
})
