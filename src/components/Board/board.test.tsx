import Board from "./Board"
import Cell from "../Cell/Cell"
import Adapter from "enzyme-adapter-react-16"
import { shallow, configure } from "enzyme"

configure({ adapter: new Adapter() })

describe("Board", () => {
    it("should render Cell component 64 times", () => {
        let wrapper = shallow(<Board />)
        expect(wrapper.find(Cell).length).toEqual(64)
    })
})
