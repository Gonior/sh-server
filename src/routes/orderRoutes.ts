import express from 'express'
import { updateBatchOrderStatus, updateOrder, findAllOrdersByDate,findLastOrder, findOrderById,findOrdersById, findOrdersNotPaid } from '../controllers/orderController'
import { findEditing } from '../controllers/tempController'
import { Order } from 'types'

const router = express.Router()

router.get('/', async (req, res) => {
	//done
	try {
		let datestring = req.query['date'] as string
		let date = new Date(datestring)
		if(isFinite(+date)) {
			let data = await findAllOrdersByDate(date)
			res.status(200).json({success : true, data})
		} else res.status(400).json({success : false, message : 'Format tanggal salah'})
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

router.patch('/:id', async (req, res) => {
	try {
		let message = "Tidak dapat merperbarui pesanan"
		let {_id, invoice, user, createdAt, updatedAt,customer,status, orders, totalitems, subtotal, discount, tax, downpayment,  grandtotal, cash, change } = req.body

		let id = req.params['id']
		let oldData = await findOrderById(id)
		if( (oldData as Order).status === "tunda" || (oldData as Order).status === "arsip") {
			let response = await updateOrder(id, {customer,_id, invoice, subtotal, tax, discount, grandtotal, orders, createdAt, updatedAt, totalitems, status, downpayment, user ,cash, change})
			
			if (response > 0) {
				let result = await findOrderById(id)
				if( result ) return res.status(200).json({success : true, data : result})
			}
		}
		else message = "Pesanan yang sudah lunas/cancel tidak dapat diubah!"
        res.status(400).json({ success: false, message: message})
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

router.get('/batch', async (req, res) => {
	//done
	try {
		let query = req.query['arrayId'] as string ?? ""
		let membersId = []
		if( query ) {
			membersId = [...query.split(',')]
		}
		let data = await findOrdersById(membersId)
		res.status(200).json({success: true, data})
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

router.post('/batch', async (req, res) => {	
	//done
	try {	
		let status = req.body.status
		let query = req.query['arrayId'] as string ?? ""
		let arrayId = []
		if(query) {
			arrayId = [...query.split(',')]
		}
		let errorInvoice : string[] = []
		if(arrayId.length > 0) {
			for (const id of arrayId) {
				let editing = await findEditing(id)
				if( editing ) errorInvoice.push((editing as Order).invoice)
			}
			if (errorInvoice.length > 0) {
				res.status(400).json({ success: false, message: `Pesanan invoice ${errorInvoice.join(', ')} tidak dapat digabungkan karenan pengguna lain yang sedang melakukan perubahan.` })
	
			} else  {
				let response = await updateBatchOrderStatus(arrayId, status)
				if (response > 0)
					res.status(200).json({ success: true, message: 'Berhasil memperbarui pesanan' })
				else res.status(400).json({ success: false, message: 'Gagal Memperbarui pesanan' })
			}
		} else {
			res.status(400).json({ success: false, message: 'Tidak ada ID pesanan' })
		}
		
	} catch (error) {
		res.status(500).json({ success: false, message: error.message })
	}
})

export default router