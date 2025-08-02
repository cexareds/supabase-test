import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { SupabaseService } from "src/config/supabase.config";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly supabaseService: SupabaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Token de acceso es requerido');
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      const {
        data: { user },
        error,
      } = await this.supabaseService.client.auth.getUser(token);

      if (error || !user) {
        throw new UnauthorizedException('Token de acceso inválido');
      }

      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token de acceso inválido o expirado');
    }
  }
}