'use client'

import { AppLayout } from '@/layouts'
import { PagePropsData, ProductData } from '@/types'
import { usePaginator } from 'momentum-paginator'
import { Card, Container, Table } from 'ui'
import DeleteProduct from './delete-product'

interface Props {
    products: Paginator<ProductData>
    auth: PagePropsData['auth']
}

export default function Index({ products, auth }: Props) {
    const paginator = usePaginator(products)
    return (
        <Container className="py-12">
            <Card>
                <Table aria-label="Products">
                    <Table.Header>
                        <Table.Column>#</Table.Column>
                        <Table.Column isRowHeader>Name</Table.Column>
                        <Table.Column />
                    </Table.Header>
                    <Table.Body items={products.data}>
                        {(item) => (
                            <Table.Row id={item.id}>
                                <Table.Cell>{item.id}</Table.Cell>
                                <Table.Cell>{item.name}</Table.Cell>
                                <Table.Cell>
                                    <DeleteProduct product={item} />
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Card>
        </Container>
    )
}

Index.layout = (page: any) => <AppLayout children={page} />
