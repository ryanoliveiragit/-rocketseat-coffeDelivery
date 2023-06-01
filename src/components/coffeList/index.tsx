import {
  ContainerCards,
  BuyCart,
  Count,
  Cart,
  Price,
  Container,
  Tags,
} from "./styles";
import { ShoppingCartSimple } from "@phosphor-icons/react";
import { coffeList } from "../../components/coffeList/list";
import { CoffeeType } from "../../@types/coffe";
import { useCart } from "../../contexts/myContexts";
import { Link } from "react-router-dom";

export function CafeList() {
  const { cart, addNewItem, removeItem, countItems, formatCurrency } = useCart();

  function addcart(data: CoffeeType) {
    addNewItem(data);
  }
  function removeCart(itemId: number) {
    removeItem(itemId);
  }
  function formatValue(value: number) {
    return formatCurrency(value)
  }

  console.log(cart);
  return (
    <Container>
      <h1>Nossos cafés</h1>
      <ul>
        {coffeList.map((cafe: CoffeeType) => {
          const count = countItems(cafe.id);
          return (
            <li key={cafe.id}>
              <ContainerCards>
                <img src={cafe.image} alt={cafe.name} />
                {cafe.tag.length === 2 ? (
                  <>
                    <Tags>
                      <span>{cafe.tag[0]}</span>
                      <span>{cafe.tag[1]}</span>
                    </Tags>
                  </>
                ) : cafe.tag.length === 3 ? (
                  <>
                    <Tags>
                      <span>{cafe.tag[0]}</span>
                      <span>{cafe.tag[1]}</span>
                      <span>{cafe.tag[2]}</span>
                    </Tags>
                  </>
                ) : (
                  <Tags>
                    <span>{cafe.tag[0]}</span>
                  </Tags>
                )}
                <h2>{cafe.name}</h2>
                <p>{cafe.description}</p>
                <BuyCart>
                  <div>

                    <Price>{formatValue(cafe.price)}</Price>
                  </div>
                  <Count>
                    <div className="count">
                      <button
                        className="remove"
                        onClick={() => removeCart(cafe.id)}
                      >
                        -
                      </button>
                      <span>{count}</span>
                      <button className="add" onClick={() => addcart(cafe)}>
                        +
                      </button>
                    </div>
                    <Cart>
                      <Link to="/checkout">
                        <ShoppingCartSimple size={15} weight="fill" />
                      </Link>
                    </Cart>
                  </Count>
                </BuyCart>
              </ContainerCards>
            </li>
          );
        })}
      </ul>
    </Container>
  );
}
