/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "i0x9f94agyjp970",
    "created": "2024-08-09 19:36:14.456Z",
    "updated": "2024-08-09 19:36:14.456Z",
    "name": "excel",
    "type": "view",
    "system": false,
    "schema": [
      {
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
      },
      {
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
      },
      {
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
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT\n  id, provider, category, SUM(amount) as total_amount, STRFTIME('%m-%Y', reception_date) AS reception_month\nFROM recup\nGROUP BY\n  STRFTIME('%m-%Y', reception_date), provider, category;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("i0x9f94agyjp970");

  return dao.deleteCollection(collection);
})
