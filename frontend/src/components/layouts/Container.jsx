import React from 'react';
const Container = React.memo((props) => {
  return (
    <main className="w-full h-full flex justify-start flex-col px-5 gap-[20px] overflow-hidden relative overflow-y-auto pt-[20px]">
            {props.children}
    </main>
  )
})

export default Container