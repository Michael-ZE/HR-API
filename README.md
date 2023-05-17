# node-api

Node JS CRUD API Example

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Install](#install)
- [Usage](#usage)
- [JSON file as storage](#json-file-as-storage)
- [DB (MySQL) as storage](#db-mysql-as-storage)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

```sh
git clone
cd node-api
npm install
```

## Usage

```sh
npm start
# or (when you work inside code and want auto restart)
npm run devstart
```

Open http://localhost:3000 to see if it works

## JSON file as storage

shifts are stored inside [data/shifts.json](data/shifts.json)

```js
// GET shifts-json
fetch("http://localhost:3000/shifts-json", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
});

// POST shifts-json/create
fetch("http://localhost:3000/shifts-json/create", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    type: "Medical leave",
    startdate: "03.03.2023",
    enddate: "06.03.2023",
    days: "4",
    status: "Approved",
    comment: "-"
  })
});

// DELETE shifts-json/delete
fetch("http://localhost:3000/shifts-json/delete", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ id: "fedcba1610309909431" })
});

// PUT shifts-json/update
fetch("http://localhost:3000/shifts-json/update", {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    type: "Medical leave",
    startdate: "03.03.2023",
    enddate: "06.03.2023",
    days: "4",
    status: "Approved",
    comment: "Multumesc"
  })
});
```
