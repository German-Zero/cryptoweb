<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { api } from '@/services/api'

const props = defineProps<{
  userId: number
}>()

const emit = defineEmits(['close', 'refresh'])

const cryptos = ['BTC', 'ETH', 'USDT'] as const
type Crypto = (typeof cryptos)[number]

const fromCrypto = ref<Crypto>('BTC')
const toCrypto = ref<Crypto>('ETH')
const amount = ref<number>(0)

const error = ref<string | null>(null)
const loading = ref(false)

const toOptions = computed(() => cryptos.filter((c) => c !== fromCrypto.value))

watch(fromCrypto, (val) => {
  if (val === toCrypto.value) {
    toCrypto.value = toOptions.value[0] ?? cryptos.find((c) => c !== val)!
  }
})

const submit = async () => {
  error.value = null

  if (!amount.value || isNaN(amount.value)) {
    error.value = 'Porfavor, pongá un monto valido'
    return
  }

  if (amount.value <= 0) {
    error.value = 'El monto debe ser mayor que 0'
    return
  }

  loading.value = true

  try {
    await api.post('/wallet/exchange', {
      userId: props.userId,
      fromCrypto: fromCrypto.value,
      toCrypto: toCrypto.value,
      amount: amount.value,
    })

    emit('refresh')
    emit('close')
  } catch (err: any) {
    error.value = err?.response?.data?.message || err?.response?.data?.error || 'Saldo Insuficiente'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div
    class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center"
    @click.self="emit('close')"
  >
    <div class="bg-[#12121a] p-6 rounded-2xl w-80 space-y-4 border border-gray-800">
      <h2 class="text-lg font-semibold text-violet-400">Intercambiar Cripto</h2>

      <select v-model="fromCrypto" class="w-full bg-[#0a0a0f] p-2 rounded">
        <option v-for="crypto in cryptos" :key="crypto" :value="crypto">
          {{ crypto }}
        </option>
      </select>

      <select v-model="toCrypto" class="w-full bg-[#0a0a0f] p-2 rounded">
        <option v-for="crypto in toOptions" :key="crypto" :value="crypto">
          {{ crypto }}
        </option>
      </select>

      <input
        type="number"
        v-model.number="amount"
        min="0"
        step="any"
        placeholder="Monto a intercambiar"
        class="w-full bg-[#0a0a0f] p-2 rounded border border-gray-800 focus:border-violet-500"
      />

      <div
        v-if="error"
        class="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg"
      >
        {{ error }}
      </div>
      <button
        @click="submit"
        :disabled="amount <= 0 || loading"
        class="w-full bg-violet-600 hover:bg-violet-700 py-2 rounded-xl disabled:opacity-50"
      >
        {{ loading ? 'Procesando...' : 'Confirmar' }}
      </button>
    </div>
  </div>
</template>
