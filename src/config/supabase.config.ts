import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseService {
  private supabaseClient: SupabaseClient;
  private supabaseAdmin: SupabaseClient;

  constructor(private configService: ConfigService) {
    // const supabaseUrl = this.configService.get<string>('supabase.url');
    // const supabaseAnonKey = this.configService.get<string>('supabase.anonKey');
    // const supabaseServiceRoleKey = this.configService.get<string>('supabase.serviceRoleKey');

    const supabaseConfig = this.configService.get('supabase');
    const { url, anonKey, serviceRoleKey } = supabaseConfig;


    if (!url || !anonKey || !serviceRoleKey) {
      throw new Error('La configuración de Supabase no está completa. Asegúrate de que las variables de entorno estén definidas.');
    }

    this.supabaseClient = createClient(url, anonKey);

    this.supabaseAdmin = createClient(url, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  get client(): SupabaseClient {
    return this.supabaseClient;
  }

  get admin(): SupabaseClient {
    return this.supabaseAdmin;
  }

  createClientWithToken(accessToken: string): SupabaseClient {
    if (!accessToken) {
      throw new Error('Access token is required to create a Supabase client.');
    }

    const supabaseConfig = this.configService.get('supabase');
    const { url, anonKey } = supabaseConfig;

    return createClient(url, anonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });
  }
}