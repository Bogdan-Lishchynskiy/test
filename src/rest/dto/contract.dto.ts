import { ApiModel, ApiModelProperty } from 'swagger-express-ts';

@ApiModel()
export class ContractDto {
    @ApiModelProperty()
    id: number;

    @ApiModelProperty()
    developerId: string;

    @ApiModelProperty()
    status: string;

    @ApiModelProperty()
    amount: number;
}