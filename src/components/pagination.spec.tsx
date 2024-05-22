import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect } from 'vitest'

import { Pagination } from '@/components/pagination.tsx'

const onPageChangeCallback = vi.fn()

describe('Pagination', () => {
    beforeEach(() => {
        onPageChangeCallback.mockClear()
    })

    it('Should display the right amount of pages and results', () => {
        const wrapper = render(
            <Pagination
                pageIndex={0}
                totalCount={200}
                perPage={10}
                onPageChange={() => {}}
            />
        )
        expect(wrapper.getByText('Page 1 of 20')).toBeInTheDocument()
        expect(wrapper.getByText('Total of 200 item(s)')).toBeInTheDocument()
    })

    it('Should be able to navigate to the next page', async () => {
        const user = userEvent.setup()
        const wrapper = render(
            <Pagination
                pageIndex={0}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />
        )

        const nextPageButton = wrapper.getByRole('button', {
            name: 'Next page'
        })

        await user.click(nextPageButton)

        expect(onPageChangeCallback).toHaveBeenCalledWith(1)
    })

    it('Should be able to navigate to the previous page', async () => {
        const user = userEvent.setup()
        const wrapper = render(
            <Pagination
                pageIndex={5}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />
        )

        const nextPageButton = wrapper.getByRole('button', {
            name: 'Previous page'
        })

        await user.click(nextPageButton)

        expect(onPageChangeCallback).toHaveBeenCalledWith(4)
    })

    it('Should be able to navigate to the fisrt page', async () => {
        const user = userEvent.setup()
        const wrapper = render(
            <Pagination
                pageIndex={5}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />
        )

        const nextPageButton = wrapper.getByRole('button', {
            name: 'First page'
        })

        await user.click(nextPageButton)

        expect(onPageChangeCallback).toHaveBeenCalledWith(0)
    })

    it('Should be able to navigate to the last page', async () => {
        const user = userEvent.setup()
        const wrapper = render(
            <Pagination
                pageIndex={5}
                totalCount={200}
                perPage={10}
                onPageChange={onPageChangeCallback}
            />
        )

        const nextPageButton = wrapper.getByRole('button', {
            name: 'Last page'
        })

        await user.click(nextPageButton)

        expect(onPageChangeCallback).toHaveBeenCalledWith(19)
    })
})