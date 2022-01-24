import { ProjectStatusEnum, StatusEnum } from 'src/enums'

export type DateType = {
  readonly createdDate: string
  readonly updatedDate: string | null
}

export type FileType = string

export type UserType = {
  readonly id: number
  readonly role: string
  readonly email: string
  readonly avatar: string
  readonly firstName: string
  readonly lastName: string
  readonly fullName: string
  readonly phone: string
  readonly description: string
}

export type PaymentMethodsType = {
  cash: boolean
  card: boolean
  transfer: boolean
}

export type RatingType = {
  readonly rating: number
  readonly count: number
}

export type PriceType = {
  readonly price: number
  readonly currency: string
}

export type PortfolioType = {
  readonly github?: string
  readonly behance?: string
  readonly link?: string
}

export type StatusType = (
  StatusEnum.ACTIVE |
  StatusEnum.INACTIVE
)

export type FreelancerType = {
  readonly id: number
  readonly stack: StackType
  readonly skills: SkillType[]
  readonly projects?: ProjectType[]
  readonly userId: number
  readonly status: StatusType
  readonly overwork: boolean
  readonly paymentMethods?: PaymentMethodsType
  readonly rating: RatingType
  readonly price?: PriceType
  readonly portfolio: PortfolioType | null
} & Omit<UserType, 'id'>

export type ClientType = {
  readonly id: number
  readonly companyName: string
  readonly position: PositionType
  readonly rating: RatingType
  readonly userId: number
} & Omit<UserType, 'id'>

export type ReviewType = {
  readonly id: number
  readonly comment: string
  readonly rating: number
  readonly user: UserType
}

export type ProjectStatusType = (
  ProjectStatusEnum.FAILED |
  ProjectStatusEnum.IN_PROGRESS |
  ProjectStatusEnum.COMPLETED
)

export type ProjectType = {
  readonly id: number
  readonly name: string
  readonly description: string
  readonly requirement: string
  readonly paymentMethods: PaymentMethodsType
  readonly price: PriceType
  readonly overwork: boolean
  readonly stack: StackType
  readonly skills: SkillType[]
  readonly status: ProjectStatusType
  readonly reassessment: boolean
  readonly file: FileType | null
  readonly freelancers: FreelancerType[] | null
  readonly freelancer: FreelancerType | null
  readonly client: ClientType
  readonly additionalComment?: string | null
  readonly review?: ReviewType
} & DateType

export type StackType = {
  readonly id: number
  readonly name: string
}

export type SkillType = {
  readonly id: number
  readonly name: string
}

export type PositionType = {
  readonly id: number
  readonly name: string
}

export type CategoryType = {
  readonly id: number
  readonly name: string
  readonly imagePath: string
  readonly count: number
}
