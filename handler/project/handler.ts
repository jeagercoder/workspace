





import { NextRequest, NextResponse } from "next/server"
import { ApiHanlder } from "@/core/api/handler"
import { CreateProjectService } from "@/services/project/project"


export class ProjectApiHandler extends ApiHanlder {
    post_service = CreateProjectService

    async post(request: NextRequest) {
        const data = await request.json()
        const service = await this.getService({data})
        if (!await service.isValid()) {
            return NextResponse.json(service.error, {status: 400})
        }
        return NextResponse.json(service.data, {status: 201})
    }
}
