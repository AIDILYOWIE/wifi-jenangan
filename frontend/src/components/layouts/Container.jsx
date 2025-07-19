import React from 'react';
const Container = React.memo((props) => {
  return (
    <main className="w-full flex justify-center flex-col px-5 gap-[20px] overflow-hidden">
            {props.children}
    </main>
  )
})

export default Container