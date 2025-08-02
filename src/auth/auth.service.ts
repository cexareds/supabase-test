import { Injectable, BadRequestException, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from 'src/config/supabase.config';
import { SignUpDto, SignInDto, ForgotPasswordDto, ResetPasswordDto, RefrestTokenDto } from './dto/auth.dto';
import { AuthResponse, userProfile } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async signUp(signUpDto: SignUpDto): Promise<AuthResponse> {
    const { email, password, name } = signUpDto;

    console.log('signUpDto:', signUpDto);

    try {
      const { data, error } = await this.supabaseService.client.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        if (error.status === 400) {
          throw new BadRequestException('Error al registrar usuario');
        }
        throw new ConflictException('Conflicto al registrar usuario');
      }

      if (!data.user) {
        throw new InternalServerErrorException('xdddddd');
      }

      return this.formatAuthResponse(data.user, data.session);
    } catch (error) {
      console.error('Error en signUp:', error);
      throw new InternalServerErrorException('Error inesperado al registrar usuario');
    }
  }

  private formatAuthResponse(user: any, session: any): AuthResponse {
    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        created_at: user.created_at,
      }
    }
  }
}
