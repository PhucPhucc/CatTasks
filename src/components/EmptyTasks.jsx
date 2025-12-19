import { Leaf } from 'lucide-react'
import React from 'react'

const EmptyTasks = () => {
  return (
    <div className='text-center'>
      <div className='inline-block bg-secondary text-success p-5 rounded-full animate-float'>
        <Leaf className='w-10 h-10' />
      </div>

      <div className='max-w-xs mx-auto my-4 font-display'>
        <p className='font-semibold text-2xl text-foreground mb-2'>
          Your garden is empty
        </p>
        <p className='text-muted-foreground'>
          Plant your first task and watch your productivity bloom!
        </p>
      </div>
    </div>
  )
}

export default EmptyTasks