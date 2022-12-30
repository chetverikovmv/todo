import * as ListsActionCreators from "./listsActionCreators"
import * as CurrentListActionCreators from "./currentListActionCreator"

export default {
    ...ListsActionCreators,
    ...CurrentListActionCreators,
}