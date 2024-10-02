'use client'

import { ProductData } from '@/types'
import { router } from '@inertiajs/react'
import React, { useState } from 'react'
import { Button, Form, Modal } from 'ui'

export default function DeleteProduct({ product }: { product: ProductData }) {
    const [open, setOpen] = useState(false)

    function requestForDelete(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        router.post(
            route('products.request-for-delete', [product]),
            {},
            {
                preserveScroll: true,
                onSuccess: () => setOpen(false)
            }
        )
    }
    return (
        <Modal isOpen={open} onOpenChange={setOpen}>
            <Button intent="danger" size="extra-small">
                Delete
            </Button>
            <Modal.Content>
                <Modal.Header>
                    <Modal.Title>Are u sure?</Modal.Title>
                    <Modal.Description>This action will notify the administrator.</Modal.Description>
                </Modal.Header>
                <Form onSubmit={requestForDelete}>
                    <Modal.Footer>
                        <Modal.Close>Cancel</Modal.Close>
                        <Button type="submit">Yup</Button>
                    </Modal.Footer>
                </Form>
            </Modal.Content>
        </Modal>
    )
}
