<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { api } from '@/services/api'
import type { Transaction } from '@/types/transaction'

const toOptions = computed(() => cryptos.filter((c) => c !== fromCrypto.value))

const cryptos = ['BTC', 'ETH', 'USDT'] as const
type Crypto = (typeof cryptos)[number]

const fromCrypto = ref<Crypto>('BTC')
const toCrypto = ref<Crypto>('ETH')

const props = defineProps<{ tx: Transaction }>()
const emit = defineEmits(['close', 'refresh'])

const form = ref({ ...props.tx })

watch(fromCrypto, (val) => {
  if (val === toCrypto.value) {
    toCrypto.value = cryptos.find((c) => c !== val)!
  }
})

const save = async () => {
  const cryptoCode = `${fromCrypto.value} -> ${toCrypto.value}`

  await api.put(`/transactions/${form.value.id}`, {
    quantity: form.value.quantity,
    money: form.value.money,
    action: 'EXCHANGE',
    cryptoCode,
  })

  emit('refresh')
  emit('close')
}
</script>

<template>
  <div
    class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center"
    @click.self="emit('close')"
  >
    <div class="bg-[#12121a] w-96 p-6 rounded-2xl border border-gray-800 space-y-5">
      <h2 class="text-lg font-semibold text-violet-400">Editar Transacción</h2>

      <div class="space-y-3">
        <div>
          <label class="text-xs text-gray-400">Cantidad</label>
          <input
            v-model="form.quantity"
            type="number"
            class="w-full mt-1 bg-[#0a0a0f] border border-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label class="text-xs text-gray-400">Monto (ARS)</label>
          <input
            v-model="form.money"
            type="number"
            class="w-full mt-1 bg-[#0a0a0f] border border-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500"
          />
        </div>

        <div>
          <label class="text-xs text-gray-400">Cambio</label>

          <div class="flex gap-2 mt-1">
            <select
              v-model="fromCrypto"
              class="w-1/2 bg-[#0a0a0f] border border-gray-800 rounded-lg px-3 py-2 text-sm"
            >
              <option v-for="crypto in cryptos" :key="crypto" :value="crypto">
                {{ crypto }}
              </option>
            </select>
            <select
              v-model="toCrypto"
              class="w-1/2 bg-[#0a0a0f] border border-gray-800 rounded-lg px-3 py-2 text-sm"
            >
              <option v-for="crypto in toOptions" :key="crypto" :value="crypto">
                {{ crypto }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="flex justify-end gap-3 pt-2">
        <button
          @click="emit('close')"
          class="text-sm px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-500 transition"
        >
          Cancelar
        </button>

        <button
          @click="save"
          class="text-sm px-4 py-2 rounded-lg bg-violet-600 hover:bg-violet-700 transition"
        >
          Guardar
        </button>
      </div>
    </div>
  </div>
</template>
