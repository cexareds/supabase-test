import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { CurrentUser } from './decorators/user.decorator';
import { SignUpDto, SignInDto, ForgotPasswordDto, ResetPasswordDto, RefrestTokenDto } from './dto/auth.dto';
import { sign } from 'crypto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Registrar nuevo usuario' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Usuario registrado exitosamente.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Error al registrar usuario.' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'Conflicto al registrar usuario.' })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  // @Post("signin")
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({ summary: "Iniciar sesión" })
  // @ApiResponse({ status: 200, description: "Inicio de sesión exitoso" })
  // @ApiResponse({ status: 401, description: "Credenciales inválidas" })
  // async signIn(@Body() signInDto: SignInDto) {
  //   return this.authService.signIn(signInDto)
  // }
}
