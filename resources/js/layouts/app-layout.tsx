import { PagePropsData } from '@/types'
import { usePage } from '@inertiajs/react'
import { FlashMessage } from 'components/flash-message'
import { Footer } from 'components/footer'
import { Navbar } from 'components/navbar'
import { PropsWithChildren, useEffect } from 'react'

export function AppLayout({ children }: PropsWithChildren) {
    const { auth } = usePage<PagePropsData>().props

    useEffect(() => {
        // @ts-ignore
        Echo.private(`product-management.${auth.user.id}`).listen(
            'RequestProductDeletion',
            ({ requestDeleteProduct }: any) => {
                console.log(requestDeleteProduct)
            }
        )

        return () => {
            // @ts-ignore
            Echo.leave(`product-management.${auth.user.id}`)
        }
    }, [auth.user.id])

    return (
        <div className="min-h-svh bg-muted/20">
            <FlashMessage />
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    )
}
