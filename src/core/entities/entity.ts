import { UniqueEntityId } from "./unique-entity-id"

export abstract class Entity<Props> {
    private _id: UniqueEntityId
    protected props: any


    protected constructor(props: Props, id?: UniqueEntityId) {
        this.props = props
        this._id = id ?? new UniqueEntityId(id)
    }

    get id() {
        return this._id
    }

    public equals(entity: Entity<any>) {
        if (entity === this) {
            return true
        }

        if (entity.id === this._id) {
            return true
        }

        return false
    }
}