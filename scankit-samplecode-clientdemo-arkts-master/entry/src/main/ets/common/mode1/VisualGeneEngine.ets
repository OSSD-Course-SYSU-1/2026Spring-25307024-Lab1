// VisualGeneEngine.ets

// ========== 1. 类型定义 ==========
export enum EffectType {
  PARTICLE_FALL = 'particle_fall',
  WAVE_RIPPLE = 'wave_ripple',
  LIGHT_TRAIL = 'light_trail',
  TREE_GROW = 'tree_grow'
}

export interface EffectConfig {
  effectType: EffectType
  primaryColor: string
  secondaryColor: string
  duration: number
  particleShape?: string
  particleCount?: number
  title?: string
}

interface VisualGeneRule {
  keywords: string[]
  config: EffectConfig
}

// ========== 2. 关键词映射规则库 ==========
const VISUAL_GENE_MAP: VisualGeneRule[] = [
  {
    keywords: ['WIFI:', 'T:WPA', 'T:WEP', 'S:'],
    config: {
      effectType: EffectType.WAVE_RIPPLE,
      primaryColor: '#4A90E2',
      secondaryColor: '#2171C7',
      duration: 2000,
      particleShape: 'circle',
      particleCount: 30,
      title: '📶 Wi-Fi 网络'
    }
  },
  {
    keywords: ['优惠券', 'coupon', 'COUPON', '折扣'],
    config: {
      effectType: EffectType.PARTICLE_FALL,
      primaryColor: '#FFD700',
      secondaryColor: '#FF6600',
      duration: 2500,
      particleShape: 'coupon',
      particleCount: 20,
      title: '🎫 优惠券'
    }
  },
  {
    keywords: ['geo:', 'location', '纬度', '经度'],
    config: {
      effectType: EffectType.LIGHT_TRAIL,
      primaryColor: '#00FF88',
      secondaryColor: '#00CC66',
      duration: 3000,
      particleShape: 'star',
      particleCount: 50,
      title: '📍 地理位置'
    }
  },
  {
    keywords: ['ISBN', 'isbn', '图书', '书籍'],
    config: {
      effectType: EffectType.TREE_GROW,
      primaryColor: '#2ECC71',
      secondaryColor: '#27AE60',
      duration: 3000,
      particleCount: 15,
      title: '📚 图书信息'
    }
  },
  {
    keywords: ['BEGIN:VCARD', 'VCARD', '名片', '联系人'],
    config: {
      effectType: EffectType.PARTICLE_FALL,
      primaryColor: '#9B59B6',
      secondaryColor: '#8E44AD',
      duration: 2000,
      particleShape: 'star',
      particleCount: 25,
      title: '👤 联系人名片'
    }
  }
]

const DEFAULT_EFFECT_CONFIG: EffectConfig = {
  effectType: EffectType.PARTICLE_FALL,
  primaryColor: '#607D8B',
  secondaryColor: '#455A64',
  duration: 1500,
  particleShape: 'circle',
  particleCount: 10,
  title: '📋 扫码结果'
}

// ========== 3. 引擎类（最终无错版）==========
export class VisualGeneEngine {
  static analyze(scanContent: string): EffectConfig {
    const lowerContent: string = scanContent.toLowerCase();
    for (const gene of VISUAL_GENE_MAP) {
      for (const keyword of gene.keywords) {
        if (lowerContent.includes(keyword.toLowerCase())) {
          return gene.config;
        }
      }
    }
    return DEFAULT_EFFECT_CONFIG;
  }
}