import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Translations {
  welcome_back: string;
  vault_id: string;
  tier: string;
  available_balance: string;
  pending_balance: string;
  dna_score: string;
  recent_activity: string;
  amount: string;
  date: string;
  description: string;
  sign_out: string;
}

const translations: Record<string, Translations> = {
  en: {
    welcome_back: "Welcome back",
    vault_id: "Vault ID",
    tier: "Tier",
    available_balance: "Available Balance",
    pending_balance: "Pending Balance",
    dna_score: "DNA Score",
    recent_activity: "Recent Activity",
    amount: "Amount",
    date: "Date",
    description: "Description",
    sign_out: "Sign Out"
  },
  es: {
    welcome_back: "Bienvenido de nuevo",
    vault_id: "ID de Vault",
    tier: "Nivel",
    available_balance: "Saldo Disponible",
    pending_balance: "Saldo Pendiente",
    dna_score: "Puntuación ADN",
    recent_activity: "Actividad Reciente",
    amount: "Cantidad",
    date: "Fecha",
    description: "Descripción",
    sign_out: "Cerrar Sesión"
  },
  fr: {
    welcome_back: "Bon retour",
    vault_id: "ID du Coffre",
    tier: "Niveau",
    available_balance: "Solde Disponible",
    pending_balance: "Solde en Attente",
    dna_score: "Score ADN",
    recent_activity: "Activité Récente",
    amount: "Montant",
    date: "Date",
    description: "Description",
    sign_out: "Se Déconnecter"
  },
  ar: {
    welcome_back: "مرحباً بعودتك",
    vault_id: "معرف الخزانة",
    tier: "المستوى",
    available_balance: "الرصيد المتاح",
    pending_balance: "الرصيد المعلق",
    dna_score: "نقاط الحمض النووي",
    recent_activity: "النشاط الحديث",
    amount: "المبلغ",
    date: "التاريخ",
    description: "الوصف",
    sign_out: "تسجيل الخروج"
  },
  ja: {
    welcome_back: "おかえりなさい",
    vault_id: "ボルトID",
    tier: "ティア",
    available_balance: "利用可能残高",
    pending_balance: "保留残高",
    dna_score: "DNAスコア",
    recent_activity: "最近のアクティビティ",
    amount: "金額",
    date: "日付",
    description: "説明",
    sign_out: "サインアウト"
  }
};

export function useLanguage(userId?: string) {
  const [language, setLanguage] = useState<string>('en');
  const [t, setT] = useState<Translations>(translations.en);

  useEffect(() => {
    const fetchUserLanguage = async () => {
      if (!userId) return;

      try {
        // Get user's region
        const { data: member } = await supabase
          .from('vault_members')
          .select('region_id')
          .eq('user_id', userId)
          .maybeSingle();

        if (member?.region_id) {
          // Get region's language
          const { data: region } = await supabase
            .from('regions')
            .select('language_code')
            .eq('id', member.region_id)
            .maybeSingle();

          if (region?.language_code) {
            setLanguage(region.language_code);
            setT(translations[region.language_code] || translations.en);
          }
        }
      } catch (error) {
        console.error('Error fetching language:', error);
      }
    };

    fetchUserLanguage();
  }, [userId]);

  return { language, t };
}