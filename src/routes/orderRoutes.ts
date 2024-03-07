import express from 'express'
import { updateBatchOrderStatus, updateOrder, findAllOrdersByDate,findLastOrder, findOrderById,findOrdersById, findOrdersNotPaid } from '../controllers/orderController'
import { findEditing } from '../controllers/tempController'

const router = express.Router()

router.patch('/', async (req, res) => {
	try {
		let order = req.body.order
		let id = req.body.id
		let data = await updateOrder(id, order)
		let result = {}
		if (data > 0) {
			result = await findOrderById(id)
            if(result) return res.status(200).json({success : true, data : result})
		}
        res.status(400).json({ success: false, message: "Tidak dapat merperbarui pesanan" })
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

router.patch('/batchStatus', async (req, res) => {
	//done
	try {
		let status = req.body.status
		let arrayId = req.body.arrayId
		let errorInvoice : string[] = []
		if(arrayId.length > 0) {
			for (const id of arrayId) {
				let editing = await findEditing(id)
				if( editing ) errorInvoice.push(editing.invoice)
			}
		}

		if (errorInvoice.length > 0) {
			res.status(400).json({ success: false, message: `Pesanan invoice ${errorInvoice.join(',')} tidak dapat digabungkan karenan pengguna lain yang sedang melakukan perubahan.` })

		} else  {
			let response = await updateBatchOrderStatus(arrayId, status)
			if (response > 0)
				res.status(200).json({ success: true, message: 'Berhasil memperbarui pesanan' })
			else res.status(400).json({ success: false, message: 'Gagal Memperbarui pesanan' })
		}
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})
// getting data orders by date
router.post('/', async (req, res) => {
	//done
	try {
		let today = new Date(req.body.today)
		let data = await findAllOrdersByDate(today)
		res.status(200).json({success : true, data})
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

router.post('/id', async (req, res) => {
	//done
	try {
		let membersId = [...req.body.membersId]
		let data = await findOrdersById(membersId)
		res.status(200).json({success: true, data})
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

router.get('/last', async (req, res) => {
	//done
	try {
	    let lastOrder = await findLastOrder()
		res.status(200).json({success : true, data :lastOrder})
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

router.get('/notPaid', async (req, res) => {
	// done
	try {
	    let orders = await findOrdersNotPaid()
		res.status(200).json({success : true, data : orders})
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

export default router