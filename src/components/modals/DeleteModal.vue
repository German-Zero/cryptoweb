<script setup lang="ts">
import { api } from '@/services/api'
import type { Transaction } from '@/types/transaction'

const props = defineProps<{ tx: Transaction }>()
const emit = defineEmits(['close', 'refresh'])

const remove = async () => {
  await api.delete(`/transactions/${props.tx.id}`)
  emit('refresh')
  emit('close')
}
</script>

<template>
  <div
    class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center"
    @click.self="emit('close')"
  >
    <div class="bg-[#12121a] w-80 p-6 rounded-2xl border border-gray-800 space-y-5">
      <h2 class="text-lg font-semibold text-red-400">Borrar Transaccion</h2>

      <p class="text-sm text-gray-400">
        Esta accion es irreversible. Estas seguro que quieres borrar esta transaccion?
      </p>

      <div class="flex justify-end gap-3 pt-2">
        <button
          @click="emit('close')"
          class="text-sm px-4 py-2 rounded-lg border border-gray-700 hover:border-gray-500 transition"
        >
          Cancelar
        </button>

        <button
          @click="remove"
          class="text-sm px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
        >
          Borrar
        </button>
      </div>
    </div>
  </div>
</template>
