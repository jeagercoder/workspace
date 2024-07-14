
import { BaseService } from '@/utils/api/service/service';
import {z} from 'zod'




export class CreateProjectService extends BaseService {
    name = z.string().min(3).max(150)
    description = z.string()
    color = z.string().length(7)
}