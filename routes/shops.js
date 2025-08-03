var express = require('express');
var router = express.Router();

const Shop = require('../models/shop')

/* GET users listing. */
router.get('/all', async function (req, res, next) {
  const shopname = req.query.name
  let condition = shopname ? { where: { shopname } } : {}
  let shopsData = await Shop.findAll(condition)

  res.status(200).json({
    success: true,
    data: shopsData
  })

});

//http://localhost:4000/shops?name=CoffeeKK
router.get('/', async (req, res) => {
  const { name } = req.query;
  let shop;
  if (name) {
    shop = await Shop.findOne({
      where: {
        name: name
      }
    });
  } else {
    return res.status(400).send('Please provide a name.');
  }

  if (!shop) {
    return res.status(404).send('Shop not found.');
  }

  res.status(200).json({
    success: true,
    data: shop
  })
});

router.post('/', async function (req, res) {
  try {
    const body = req.body
    if (!body.name || !body.address) {
      throw new Error("name or address is required.!")
    }
    let result = await Shop.create({
      name: body.name,
      address: body.address,
    })
    res.status(200).json({
      success: true,
      message: "Created shop successfully!.",
      data: result
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
})

router.put('/:id', async function (req, res) {
  try {
    const body = req.body
    const id = req.params.id
    const shop = await Shop.findOne({
      where: {
        id: id
      },
      raw: true
    })
    if (!shop) {
      throw new Error("Shop not found.")
    }

    let data = shop

    if (body.name) {
      data.name = body.name
    }

    if (body.address) {
      data.address = body.address
    }

    let result = await Shop.update(data, {
      where: {
        id: id
      }
    })
    res.status(200).json({
      success: true,
      message: "Updated Shop Successfully!.",
      data: result
    })

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id
    const shop = await Shop.findOne({
      where: {
        id: id
      },
      raw: true
    })
    if (!shop) {
      throw new Error("Shop not found.")
    }
    let result = await Shop.destroy({
      where: {
        id: id
      }
    })
    res.status(200).json({
      success: true,
      message: "Delete Shop Successfully!.",
      data: result
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
})

module.exports = router;