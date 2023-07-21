export default function list() {
  let product = ["tomatoes", "pasta", "potato"];

  return (
    <div>
      <h4>
        {product.map((v, i) => {
          return (
            <div>
              <h4>{v}</h4>
            </div>
          );
        })}
      </h4>
    </div>
  );
}
