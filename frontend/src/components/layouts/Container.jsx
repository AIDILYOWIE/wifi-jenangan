
const Container = (props) => {
  return (
    <main className="w-full mx-auto px-5">
        <div className="w-full">
            {props.children}
        </div>
    </main>
  )
}

export default Container